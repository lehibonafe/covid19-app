var vm = new Vue({
    el: '#data-container',
    data() {
        return {
            ph_data: {
                totalCases: null,
                active: null,
                deaths: null,
                recovered: null
            },
            global_data: {
                totalCases: null,
                active: null,
                deaths: null,
                recovered: null
            },
            countries: {
                country: [],
                countryName: [],
                country_totalCases: [],
                country_deaths: []
            }
        }
    },
    mounted() {
        
        Promise.all([   
        fetch('https://disease.sh/v3/covid-19/countries/Philippines?strict=true'),
        fetch('https://disease.sh/v3/covid-19/all?allowNull=true'),
        fetch('https://disease.sh/v3/covid-19/countries?yesterday=true&sort=cases')
        ]).then(responses => {
            // Get a JSON object from each of the responses
            return Promise.all(responses.map(function (response) {
                return response.json();
            }));
        })
        .then(data => {

            this.ph_data.totalCases = data[0].cases.toLocaleString('en-US');
            this.ph_data.active = data[0].active.toLocaleString('en-US');
            this.ph_data.deaths = data[0].deaths.toLocaleString('en-US');
            this.ph_data.recovered = data[0].recovered.toLocaleString('en-US');

            this.global_data.totalCases = data[1].cases.toLocaleString('en-US');
            this.global_data.active = data[1].active.toLocaleString('en-US');
            this.global_data.deaths = data[1].deaths.toLocaleString('en-US');
            this.global_data.recovered = data[1].recovered.toLocaleString('en-US');


            for(let i = 0; i < 10; i++){
                this.countries.country.push(data[2][i].countryInfo.flag);
                this.countries.countryName.push(data[2][i].country);
                this.countries.country_totalCases.push(data[2][i].cases.toLocaleString('en-US'));
                this.countries.country_deaths.push(data[2][i].deaths.toLocaleString('en-US'));
            }    
        })
        .catch(error => {
            console.log(error);
        })

    },
})