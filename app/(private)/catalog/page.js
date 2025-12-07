"use client";

import { CatalogMusic } from "@/components/pages/catalog/Catalog";
import { SectionHeader } from "@/components/common/Header";
import { NewTrackForm } from "@/components/forms/Catalog";
import { EmptySection } from "@/components/common/Empty";
import { catalogService } from "@/services/catalog";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from "@/services/user";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { photosService } from "@/services/files";

const defaultData = {
    titulo: "",
    genero: "",
    mood: "",
    bpm: "120",
    duracao: "180",
    status: "disponivel",
    preco: "0,00",
    linkExterno: "",
    arquivoNome: "",
    publicoPortfolio: true,
};

export default function Catalog() {
    const router = useRouter();
    const queryClient = useQueryClient();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTrack, setEditingTrack] = useState(null);
    const [formData, setFormData] = useState(defaultData);
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const { data, isLoading, error } = useQuery({
        queryKey: ['catalog'],
        queryFn: catalogService.getCatalog,
    });

    const { data: user } = useQuery({
        queryKey: ['user'],
        queryFn: userService.getMe,
    });

    const createMutation = useMutation({
        mutationFn: catalogService.createCatalog,
        onSuccess: () => {
            queryClient.invalidateQueries(['catalog']);
            handleCloseModal(false);
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => catalogService.updateCatalog(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['catalog']);
            handleCloseModal(false);
        },
    });

    useEffect(() => {
        if (editingTrack) {
            setFormData({
                titulo: editingTrack.title || "",
                genero: editingTrack.gender || "",
                mood: editingTrack.mood || "",
                bpm: editingTrack.bpm || "120",
                duracao: editingTrack.duration || "180",
                status: editingTrack.status || "disponivel",
                preco: editingTrack.suggested_price || "0,00",
                linkExterno: editingTrack.external_link || "",
                arquivoNome: editingTrack.audio_file || "",
                publicoPortfolio: editingTrack.is_public ?? true,
            });
        } else {
            setFormData(defaultData);
        }
    }, [editingTrack]);

    const handleEdit = (track) => {
        setEditingTrack(track);
        setIsModalOpen(true);
    };

    const handleCloseModal = (open) => {
        setIsModalOpen(open);
        if (!open) {
            setEditingTrack(null);
            setFormData(defaultData);
            setSelectedFile(null);
            setLoading(false);
        }
    };

    const handleSetInput = (campo, valor) => {
        setFormData(prev => ({ ...prev, [campo]: valor }));
    };

    const handleFileSelect = (file) => {
        setSelectedFile(file);
    };

    const handleSalvar = async () => {
        setLoading(true);

        try {
            let fileId = null;
            if (selectedFile) {
                fileId = await photosService.upload(selectedFile);
            }

            const payload = {
                title: formData.titulo,
                gender: formData.genero,
                mood: formData.mood,
                bpm: formData.bpm,
                duration: formData.duracao,
                status: formData.status,
                suggested_price: formData.preco,
                external_link: formData.linkExterno,
                is_public: formData.publicoPortfolio,
                ...(fileId && { audio_file: fileId }),
            };

            if (editingTrack) {
                updateMutation.mutate({ id: editingTrack.id, data: payload });
            } else {
                createMutation.mutate(payload);
            }
        } catch (error) {
            console.error('Erro ao salvar:', error);
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col animate-fadeSlideIn gap-6">
            <SectionHeader
                title="Catalogos"
                description="Veja seus catalogos"
                buttonText="Adicionar Catalogo"
                onButtonClick={() => setIsModalOpen(true)}
            />

            {data?.length > 0 ? (
                <div className="grid grid-cols-2 gap-6">
                    {data.map((track) => (
                        <CatalogMusic
                            key={track.id}
                            id={track.id}
                            title={track.title}
                            genre={track.gender}
                            mood={track.mood}
                            bpm={parseInt(track.bpm)}
                            status={track.status}
                            price={track.suggested_price}
                            duration={`${Math.floor(parseInt(track.duration) / 60)}:${(parseInt(track.duration) % 60).toString().padStart(2, '0')}`}
                            onViewPortfolio={() => router.push(`/portfolio/${user?.id}`)}
                            onEdit={() => handleEdit(track)}
                        />
                    ))}
                </div>
            ) : (
                <EmptySection
                    title={"Nenhuma obra-prima ainda"}
                    description={"Adicione sua primeira obra-prima e comece a construir seu império musical."}
                />
            )}

            <NewTrackForm
                open={isModalOpen}
                onOpenChange={handleCloseModal}
                data={formData}
                setInput={handleSetInput}
                onCancelar={() => handleCloseModal(false)}
                onSalvar={handleSalvar}
                onFileSelect={handleFileSelect}
                loading={loading}
            />
        </div>
    );
}