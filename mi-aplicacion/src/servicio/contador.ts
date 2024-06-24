'use server'
import prisma from '@/lib/prisma'

export async function mostrarNumero() {
    return prisma.numero.findFirst()
}

export async function incrementarNumero() {
    const contador = await prisma.numero.findFirst()
    const n = contador?.numero! + 1
    const id = contador?.id!
    await prisma.numero.update({where: {id: id}, data: {numero:n}})
}

export async function decrementarNumero(){
    const contador = await prisma.numero.findFirst()
    const n = contador?.numero! - 1
    const id = contador?.id!
    if (n >= 0){
        await prisma.numero.update({where: {id: id}, data: {numero:n}})
    } else {
        return false
    }
}