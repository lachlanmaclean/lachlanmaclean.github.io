// Screen Scraperr for Tonberry

const axios = require('axios');
const cheerio = require('cheerio');
const url = 'https://na.finalfantasyxiv.com/lodestone/worldstatus/';

axios(url)
    .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);
        const list = [];
        let currentName = '';
        let currentStatus = '';
        let count = 0;
        let totalCount =0;
        $('.world-list__item p').each(function(){
                if (count === 0){
                    currentName = $(this).text();
                    count++;
                }
                else if (count === 1){
                    currentStatus = $(this).text();
                    //console.log(`${currentStatus} \n`);
                    count = 0;
                    totalCount++;
                    list.push({
                        Count: totalCount,
                        Name: currentName,
                        Status: currentStatus
                    });
                }
            }
        );
        let selection = list.find(obj=> obj.Name === "Tonberry");
        console.log(selection.Name + ": " + selection.Status)
    }).catch(console.error);