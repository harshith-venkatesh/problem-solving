const highLightText = (sentence, keywords)  => {
    const uniqueKeywords = new Set(keywords);
    const result = sentence.split(" ").map(word => {
        let output = '';
        if(uniqueKeywords.has(word)) {
            output += `<strong>${word}</strong>`
        } else {
            for(let i=0;i<word.length;i++) {
                const prefix = word.slice(0, i+1);
                const suffix = word.slice(i+1);
                if(uniqueKeywords.has(prefix) && uniqueKeywords.has(suffix)) {
                    output += `<strong>${prefix}${suffix}</strong>`;
                } else if(uniqueKeywords.has(prefix) && !uniqueKeywords.has(suffix)) {
                    output += `<strong>${prefix}</strong>${suffix}`;
                } else if(!uniqueKeywords.has(prefix) && uniqueKeywords.has(suffix)) {
                    output += `${prefix}<strong>${suffix}</strong>`;
                } 
            }
        }
        return output!=='' ? output : word;
    });

    return result.join(" ");

}

const str = "Hi How are you where are you?";
const keywords = ["are", "you", "?", "Hi"];
console.log(highLightText(str, keywords));