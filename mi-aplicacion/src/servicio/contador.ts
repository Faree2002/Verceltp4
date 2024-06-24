'use server'
import prisma from '@/lib/prisma'
import 'dotenv/config';
export async function mostrarNumero() {
    return prisma.numero.findFirst()
}

export async function incrementarNumero() {
    let contador = await prisma.numero.findFirst();
    if (!contador) {
        // If no record exists, create a new record with a default number, e.g., 1
        contador = await prisma.numero.create({
            data: {
                numero: 1 // Assuming 'numero' is the field to store the number and starts at 1
                // Add other necessary fields as required
            }
        });
    } else {
        // If a record exists, increment its number
        const n = contador.numero + 1;
        const id = contador.id;
        await prisma.numero.update({where: {id: id}, data: {numero: n}});
    }
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