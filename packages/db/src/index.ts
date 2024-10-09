import { PrismaClient} from "@prisma/client"

const newPrismaClient = () => {
    return new PrismaClient()
}
type prismaType = ReturnType<typeof newPrismaClient>
declare global {
    var prisma: prismaType | undefined
}
if(!globalThis.prisma){
    globalThis.prisma = newPrismaClient()
}

export default globalThis.prisma