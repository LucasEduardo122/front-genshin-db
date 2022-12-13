import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"

interface charsProps {
  name: string,
  fullname: string,
  title: string,
  description: string,
  rarity: string,
  element: string,
  weapontype: string,
  substat: string,
  gender: string,
  body: string,
  association: string,
  region: string,
  affiliation: string,
  birthdaymmdd: string,
  birthday: string,
  constellation: string,
  cv: string[],
  costs: string[],
  images: {
    image: string,
    card: string,
    cover1: string,
    cover2: string,
    icon: string
  },
  url: string[],
  version: string
}

export default function Home() {

  const [data, setData] = useState<charsProps[]>([]);

  useEffect(() => {
    async function getData() {
      let getPersons = await fetch('https://genshin-db-api.vercel.app/api/characters?query=names&dumpResult=true&matchNames=false&matchAltNames=false&matchCategories=true&verboseCategories=true')
      let dadosPersons = await getPersons.json();
      setData(dadosPersons.result)
      console.log(dadosPersons.result)
    }

    getData();
  }, [])

  const route = useRouter();

  return (
    <section className="px-4 pt-20 pb-48">
      <div className="container mx-auto">
        <div className="mx-auto w-full px-4 text-center lg:w-6/12">
          <h2 className="block antialiased tracking-normal font-sans text-4xl font-semibold leading-[1.3] text-blue-gray-900 mb-3">
            Genshin DB - Beta 1 (Lector133)
          </h2>
          <p className="block antialiased font-sans text-xl font-normal leading-relaxed text-blue-gray-500">
            Base de dados completa dos personagens de genshin.
          </p>
        </div>
        <div className="mt-24 grid grid-cols-1 gap-12 gap-x-24 md:grid-cols-2 xl:grid-cols-4">
          {data.map((personagem: charsProps) => {
            return (
              <a key={personagem.name} onClick={(() => route.push({
                pathname: `/chars/[name]`,
                query: {name: personagem.name}
              }))}>
                <div className="relative flex flex-col items-center bg-clip-border rounded-xl bg-transparent text-gray-700 shadow-none text-center">
                  <Image
                    src={personagem.images.icon}
                    alt={personagem.name}
                    width={358}
                    height={358}
                    quality={100}
                    className="inline-block relative object-cover object-center rounded-2xl h-[191px] w-[312px] shadow-lg shadow-gray-500/25"
                  />
                  <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-blue-gray-900 mt-6 mb-1">
                    {personagem.name}
                  </h5>
                  <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-500">
                    {personagem.element}
                  </p>
                  <div className="mx-auto mt-5">
                    <div className="flex items-center gap-2">
                      <button
                        className="relative middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-light-blue-500 hover:bg-light-blue-500/10 active:bg-light-blue-500/30"
                        type="button"
                      >
                        <span className="absolute top-1/3 left-1/3 transform -translate-y-1/3 -translate-x-1/3">
                          <Image src={`https://genshin.honeyhunterworld.com/img/icons/element/${personagem.element.toLowerCase() == "none" ? personagem.element.toLowerCase() : personagem.element.toLowerCase()}${personagem.element.toLowerCase() == "none" ? `_35.webp` : `_50.webp`}`} width={200} height={200} alt="element" />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>

  )
}
