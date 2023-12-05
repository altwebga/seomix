type HeroProp = {
    title: string,
    subtitle: string
}

export default function Hero({title, subtitle}: HeroProp){
    return(
        <div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
        </div>
    )
}