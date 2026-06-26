import { useEffect, useState } from "react";
import { getForos } from "../../services/createForoService";
import {getMyFollow} from "../../services/followService"

export const useFeed = () => {

    const [foros, setForos] = useState([]);
    const [followForos, setFollowForos] = useState([])
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [activeTag, setActiveTag] = useState("");

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        loadForos();
        loadFollowForos();
    }, []);

    const loadForos = async () => {
        try {
            const data = await getForos();
            console.log(data);
            setForos(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

   const loadFollowForos = async () => {
    try {

        const data = await getMyFollow();

        setFollowForos(
            data.slice(-3).reverse()
        );

    } catch (error) {

        console.log(error);

    }
};

    const allTags = [
        ...new Set(
            foros.flatMap((foro) => foro.tags ?? [])
        )
    ];

    const filteredForos = foros.filter((foro) => {
        const matchSearch = foro.title
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchTag =
            activeTag === "" ||
            (foro.tags ?? []).includes(activeTag);

        return matchSearch && matchTag;
    });

    const myForos = foros
        .filter((foro) => Number(foro.user_id) === Number(user?.id))
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    return {
  loading,
    search,
    setSearch,
    filteredForos,
    myForos,
    followForos,
    loadFollowForos,
    allTags,
    activeTag,
    setActiveTag
};
};