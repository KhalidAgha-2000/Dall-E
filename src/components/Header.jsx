
const Header = ({ header, paragraph }) => {
    return (
        <div>
            <h1 className="font-extrabold text-[#222328] text-[32px]">{header}</h1>
            <p className="mt-2 text-[#666e75] text-[16px] max-w-full ">{paragraph}</p>
        </div>
    )
}
export default Header