import {User} from "@/models/User";
import {mongooseConnect} from "@/lib/mongoose";
import {isAdminRequest} from "@/pages/api/auth/[...nextauth]";

export default async function handle(req, res) {
    const {method} = req;
    await mongooseConnect();
    await isAdminRequest(req, res);

    if (method === 'GET') {
        res.json(await User.find());
    }

    if (method === 'POST') {
        const {email, name} = req.body;
        const userDoc = await User.create({email, name});
        res.json(userDoc);
    }

    if (method === 'PUT') {
        const {email, name, _id} = req.body;
        const userDoc = await User.updateOne({_id}, {email, name});
        res.json(userDoc);
    }

    if (method === 'DELETE') {
        const {_id} = req.query;
        await User.deleteOne({_id});
        res.json('ok');
    }
}
