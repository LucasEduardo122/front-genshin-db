import Image from "next/image";

export async function getServerSideProps(context: any) {
    let teste;
    let errors = false;

    try {
        let data = await fetch(`https://genshin-db-api.vercel.app/api/characters?query=${context.params.name.toLowerCase()}`)

        teste = await data.json()
    } catch (error) {
        errors = true;
    }

    teste == undefined ? teste = null : teste

    return {
        props: {
            teste,
            errors
        }
    }

}

export default function Char({ teste, errors }: any) {
    return (
        <section className="px-4 pt-20 pb-48">
            {errors 
            
            ?  
            
            <div className="container mx-auto">
                <div className="mt-24 w-full text-center">
                    <p>Nenhum dado encontrado para o nome atual</p>
                </div>
            </div> 
            
            : 
            
            <div className="container mx-auto">
                <div className="mx-auto w-full px-4 text-center lg:w-6/12">
                    <h2 className="block antialiased tracking-normal font-sans text-4xl font-semibold leading-[1.3] text-blue-gray-900 mb-3">
                        Personagem: {teste.name}
                    </h2>
                    <p className="block antialiased font-sans text-xl font-normal leading-relaxed text-blue-gray-500">
                        Estrelas: {teste.rarity}
                    </p>
                </div>
                <div className="mt-24 w-full">
                    <div className="relative flex flex-col items-center bg-clip-border rounded-xl bg-transparent text-gray-700 shadow-none text-center">
                        <Image
                            src={teste.images.icon}
                            alt={teste.name}
                            width={358}
                            height={358}
                            quality={100}
                            className="inline-block relative object-cover object-center rounded-2xl h-[191px] w-[312px] shadow-lg shadow-gray-500/25"
                        />
                        <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-blue-gray-900 mt-6 mb-1">
                            {teste.name}
                        </h5>
                        <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-500">
                            {teste.element}
                        </p>
                        <div className="mx-auto mt-5">
                            <div className="flex items-center gap-2">
                                <button
                                    className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-light-blue-500 hover:bg-light-blue-500/10 active:bg-light-blue-500/30"
                                    type="button"
                                >
                                    <span className="absolute top-1/3 left-1/3 transform -translate-y-1/3 -translate-x-1/3">
                                        <Image src={`https://genshin.honeyhunterworld.com/img/icons/element/${teste.element.toLowerCase() == "none" ? teste.element.toLowerCase() : teste.element.toLowerCase()}${teste.element.toLowerCase() == "none" ? `_35.webp` : `_50.webp`}`} width={200} height={200} alt="element" />
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        </section>
    )
} 