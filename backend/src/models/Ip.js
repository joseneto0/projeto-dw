import prisma from './prisma.js';

async function create(ip){
    const newIp = await prisma.ip.create({
        data: ip
    });

    return newIp;
}

async function readAll(){
    const ips = await prisma.ip.findMany();
    return ips;
}

async function read(id) {
    const ip = await prisma.ip.findMany({
        where: {
            id,
        },
    });

    return ip;
}

async function update(ip, id){
    const newIp = await prisma.ip.update({
        data: ip,
        where: {
            id,
        },
    });
    
    return newIp;
}

async function remove(id){
    return await prisma.ip.delete({
        where: {
            id,
        },
    });
}

export default { create, readAll, read, update, remove };