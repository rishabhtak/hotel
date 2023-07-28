import Breadcrumb from '../components/Layout/Breadcrumb'

export default function About() {
    return (
        <>
            <Breadcrumb img="/slider3.jpg" pageName="about us" />
            <section>
                <div className="mx-auto py-16 sm:py-24">
                    <div className="mt-8 grid grid-cols-1 lg:grid-cols-2">
                        <div className="relative h-[30rem]">
                            <img alt="Party" src="https://images.unsplash.com/photo-1496843916299-590492c751f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80" className="absolute inset-0 h-full w-full object-cover" />
                        </div>
                        <div className="px-16 py-16">
                            <article className="text-justify space-y-4 px-10 text-gray-600">
                                <h2 className="text-3xl font-bold sm:text-4xl pb-5">
                                    Our Vision
                                </h2>
                                <p>
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut qui
                                    hic atque tenetur quis eius quos ea neque sunt, accusantium soluta
                                    minus veniam tempora deserunt? Molestiae eius quidem quam repellat.
                                </p>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum
                                    explicabo quidem voluptatum voluptas illo accusantium ipsam quis,
                                    vel mollitia? Vel provident culpa dignissimos possimus, perferendis
                                    consectetur odit accusantium dolorem amet voluptates aliquid,
                                    ducimus tempore incidunt quas. Veritatis molestias tempora
                                    distinctio voluptates sint! Itaque quasi corrupti, sequi quo odit
                                    illum impedit!
                                </p>
                            </article>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        <div className="px-16 py-16">
                            <article className="text-justify space-y-4 px-10 text-gray-600">
                                <h2 className="text-3xl font-bold sm:text-4xl pb-5">
                                    Our Vision
                                </h2>
                                <p>
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut qui
                                    hic atque tenetur quis eius quos ea neque sunt, accusantium soluta
                                    minus veniam tempora deserunt? Molestiae eius quidem quam repellat.
                                </p>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum
                                    explicabo quidem voluptatum voluptas illo accusantium ipsam quis,
                                    vel mollitia? Vel provident culpa dignissimos possimus, perferendis
                                    consectetur odit accusantium dolorem amet voluptates aliquid,
                                    ducimus tempore incidunt quas. Veritatis molestias tempora
                                    distinctio voluptates sint! Itaque quasi corrupti, sequi quo odit
                                    illum impedit!
                                </p>
                            </article>
                        </div>
                        <div className="relative h-[30rem]">
                            <img alt="Party" src="https://images.unsplash.com/photo-1496843916299-590492c751f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80" className="absolute inset-0 h-full w-full object-cover" />
                        </div>
                    </div>
                </div>

            </section>

        </>
    )
}

