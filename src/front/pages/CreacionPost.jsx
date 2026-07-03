import { useParams } from "react-router-dom";
import { CreatePost } from "../components/Post/Createpost";

export const CreacionPost = () => {

    const { forumId } = useParams();

    return (
        <div className="container mt-5">
            <CreatePost forumId={forumId} />
        </div>
    );
};