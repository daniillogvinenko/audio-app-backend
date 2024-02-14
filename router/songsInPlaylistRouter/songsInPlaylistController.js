import { database } from "../../db.js";

const { songs, playlists } = database;

export const songsInPlaylistController = {
    getOne: (req, res) => {
        // находим нужный плейлист
        const index = playlists.findIndex((item) => +item.id === +req.params.id);
        let songIds = playlists[index].songs;

        let resItems = songs.filter((song) => songIds.includes(song.id));

        if (index > -1) {
            res.status(200).json(resItems);
        } else {
            res.status(500).json({ message: `${entityName.slice(0, -1)} not found` });
        }
    },
};
