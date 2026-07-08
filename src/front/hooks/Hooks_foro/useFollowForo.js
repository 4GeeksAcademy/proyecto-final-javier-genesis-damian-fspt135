import { useState, useEffect } from "react";
import { followForo, unfollowForo } from "../../../services/followService";


export const useFollowForo = (foro) => {

    const [error, setError] = useState(null);
    const [isFollowed, setIsFollowed] = useState(foro?.follow_by_user || false);
    const [followCount, setFollowCount] = useState(foro?.followers_count || 0);

    useEffect(() => {
        if (foro) {
            setIsFollowed(foro.follow_by_user || false);
            setFollowCount(foro.followers_count || 0);
        }
    }, [foro]);
    
    const handleFollowForo = async (foroId) => {
        try {
            if (isFollowed) {
                await unfollowForo(foroId);
                setFollowCount(followCount - 1);
            } else {
                await followForo(foroId);
                setFollowCount(followCount + 1);
            }
            setIsFollowed(!isFollowed);
        } catch (error) {
            setError(error.message);
        }
    };

    return { 
        isFollowed, 
        followCount, 
        handleFollowForo, 
        error 
    };
}