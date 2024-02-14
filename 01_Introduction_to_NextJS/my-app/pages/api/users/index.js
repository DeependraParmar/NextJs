import { createUser, getUsers } from "@/app/lib/prisma/prisma";

const handler = async(req,res) => {
    if(req.method === "GET"){
        try{
            const {users, error} = await getUsers();

            if(error) throw new Error(error);
            return res.status(200).json({
                success: true,
                users
            });
        }
        catch(error){
            return res.status(500).json({
                success: false,
                error: error.message,
            })
        }
    }

    if(req.method === "POST"){
        try{
            const data = req.body;
            const {user, error} = await createUser(data);

            if(error) throw new Error(error);

            return res.status(200).json({
                success: true,
                message: "User Created Successfully...",
                user,
            });
        }
        catch(error){
            return res.status(500).json({
                success: false,
                message: error.message,
            })
        }
    }

    res.setHeader('Allow', ['GET','POST']);
    res.status(425).end(`Method ${req.method} is not allowed`);
}

export default handler;