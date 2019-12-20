import number from './number'
(async () => {
    try {
        let re = await number()
        console.log(re)
    } catch (e) {
        console.log(e)
    }
})()