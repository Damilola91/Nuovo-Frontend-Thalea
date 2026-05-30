import Image from "next/image";
const HERO_IMAGE =
  "https://res.cloudinary.com/dbxysr1a6/image/upload/v1779876843/SICILIAN-TASTE-SERVER-UPLOADS/A1404B4E-05E9-4B0B-91D6-8E69A0BF5BB9.png";


const GalleryHero = () => {
    return (
            <section className="mx-auto max-w-6xl px-6">
        <div className="overflow-hidden rounded-xl" style={{ aspectRatio: "16 / 7" }}>
          <Image
            src={HERO_IMAGE}
            alt="Thălēa Apartment"
            width={1600}
            height={700}
            priority
            className="h-full w-full object-cover"
          />
        </div>
      </section>
    )
}

export default GalleryHero