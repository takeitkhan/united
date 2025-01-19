export default function truncate(str, limit) {
    const noTags = str.replace(/<\/?[^>]+(>|$)/g, "");

    const parser = new DOMParser();
    let decodedString = parser.parseFromString(noTags, "text/html").documentElement.textContent;
    decodedString = decodedString.replace(/&nbsp;/g, " ");

    if (decodedString.length > limit) {
        let truncated = decodedString.substring(0, limit);

        if (decodedString.charAt(limit) !== ' ') {
            truncated = truncated.substring(0, truncated.lastIndexOf(" "));
        }

        decodedString = truncated + "...";
    }
    
    return decodedString;
}


export const stripHtmlTags = (html) => {
    if (typeof html !== 'string') {
        console.warn('Input is not a string:', html);
        return ''; // Return an empty string or handle it accordingly
    }
    return html.replace(/<[^>]*>?/gm, '');
};
