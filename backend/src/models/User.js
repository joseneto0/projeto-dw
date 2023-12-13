import prisma from './prisma.js';
import bcrypt from 'bcrypt';
const saltRounds = Number(process.env.SALT);

async function create(user){
    const hash = await bcrypt.hash(user.password, saltRounds);
    user.password = hash;
    const newUser = await prisma.user.create({
        data: user
    });

    return newUser;
}

async function readAll(){
    const users = await prisma.user.findMany();
    return users;
}

async function read(id) {
    const user = await prisma.user.findFirst({
        where: {
            id,
        },
    });
    return user;
}

async function update(user, id){
    const hash = await bcrypt.hash(user.password, saltRounds);
    user.password = hash;
    const newUser = await prisma.user.update({
        data: user,
        where: {
            id,
        },
    });
    
    return newUser;
}

async function remove(id){
    return await prisma.user.delete({
        where: {
            id,
        },
    });
}

export default { create, readAll, read, update, remove };