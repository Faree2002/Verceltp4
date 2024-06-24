
import { decrementarNumero, incrementarNumero, mostrarNumero } from "@/servicio/contador"
import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query"

export const traerNumerosQuery = queryOptions({
    queryKey: ['numero'],
    queryFn: () => mostrarNumero(),
    staleTime: Infinity
})

export const useSumarQuery = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['sumar'],
        mutationFn: async () => {
            return incrementarNumero()
        },
        onSuccess: () => {
            queryClient.invalidateQueries(traerNumerosQuery);
        },
    })
}

export const useRestarQuery = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ['restar'],
        mutationFn: async () => {
            return decrementarNumero()
        },
        onSuccess: () => {
            queryClient.invalidateQueries(traerNumerosQuery);
        },
    })
}