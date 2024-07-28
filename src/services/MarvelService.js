
import { useHttp } from "../hooks/http.hook";


const  useMarvelService = () =>  {
    const {loading, request, error,clearError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=027a0cf1ba643b4b6e68a2ef3f4454a3';
    const _baseOffset = 210;
   


    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getAllComics = async (offset = 0) => {
        const res = await request (
            `${_apiBase}comics?offset=${offset}&${_apiKey}`
        );

        return res.data.results.map(_transformComics);
        

    };

    // Вариант модификации готового метода для поиска по имени.
	// Вызывать его можно вот так: getAllCharacters(null, name)

	// const getAllCharacters = async (offset = _baseOffset, name = '') => {
	//     const res = await request(`${_apiBase}characters?limit=9&offset=${offset}${name ? `&name=${name}` : '' }&${_apiKey}`);
	//     return res.data.results.map(_transformCharacter);
	// }

	// Или можно создать отдельный метод для поиска по имени

    const getCharacterByName = async (name) => {
		const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
		return res.data.results.map(_transformCharacter);
	};

    const getComic = async (id) => {
        const res = await request (`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0]);
    };

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description || "Trhere is no description",
            pageCount: comics.pageCount ? `${comics.pageCount} p.` : "No information about the number of pages",
            thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
            language: comics.textObjects[0]?.language || "en-us",
            // optional chaining operator
            price: comics.prices[0].price ? `${comics.prices[0].price}$` : "not avialable"
        };
    };




    // В этом методе будем получать какие то данные и возвращать объект
    // вернется объект с теми сво-вами котрые нам только нужны
    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 200)}...` : 'There is no data on this character...',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    return {loading, error, clearError, getAllCharacters, getCharacter, getCharacterByName, getAllComics, getComic}
}


export default useMarvelService;