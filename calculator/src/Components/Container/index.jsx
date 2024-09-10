export default function Container({ children }) {
        return (
                <div className="container mx-auto min-w-72 max-w-96 p-4 my-8 flex flex-col justify-center items-center rounded-2xl bg-white gap-4 overflow-hidden">
                        {children}
                </div>
        )
}