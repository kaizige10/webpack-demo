export default function number() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const [a, b] = [12, 34]
            resolve({
                a,
                b
            })
        }, 1000);
    })
}