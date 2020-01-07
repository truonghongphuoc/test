const moment = require('moment')
const axios = require('axios')

const indexPrefix = [
    "logstash-server",
    "dev-ap-southeast-1",
    "prod-jp",
    "prod-singapore",
    "prod-mes1",
    "prod-sae1",
    "prod-sydney",
    "lambda-sae1",
    "lambda-apne1",
    "lambda-apse1",
    "lambda-apse2",
    "lambda-mes1"
]
const indexBackup = []
const backupDate = moment().subtract(36, 'days').format('YYYY.MM.DD')

const baseURL = 'https://vpc-applog-ni267rsyexhlif3frhzbloromi.ap-southeast-1.es.amazonaws.com/'
const snapshotURI = '_snapshot/es-applog-repo/' + 'backup-' + backupDate
indexPrefix.forEach(partern => {
    indexBackup.push(partern = partern + '-' + backupDate)
})

const payload = {
    "indices": indexBackup.join(','),
    "ignore_unavailable": true,
    "include_global_state": false
}
const dataObj = {
    baseURL,
    indexBackup,
    snapshotURI,
    payload
}

async function run(dataObj) {
    const {
        baseURL,
        indexBackup,
        snapshotURI,
        payload
    } = dataObj;

    try {
        // const response = await axios.put(baseURL + snapshotURI, payload)
        // console.log('Update Schema', response.data)

        for(const index of indexBackup) {
            console.log(baseURL+index)
           await axios.delete(baseURL+index)
            .then((response) => {
                if (response.status === 200) {
                    console.log('====Delete index ' + index + ' sucessfull') 
                }
            }).catch((error) => {
                // console.log(error.status)
                console.log('Error when trying to delete ' + index)
            })
            // try {
            //     await axios.delete(baseURL+index)
            //     // console.log(response.data)
            //     console.log('Delete index ' + index + ' sucessfull') 
            // } catch (error) {
            //     console.log('Error when trying to delete ' + index)
            // }
        }
    } catch (error) {
        console.log(error);
    }
}

run(dataObj).then(() => {
    console.log('done');
})
