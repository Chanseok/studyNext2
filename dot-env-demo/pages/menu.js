export default function Menu(props) {
    return (
        <>
            <table>
                {props.menu.map( item => (
                    <tr key={item[0]}>
                        <td>{item[0]}</td>
                        <td>{item[1]}</td>

                    </tr>
                ))}
            </table>
        </>
    )

}

Menu.getInitialProps = async () => {
    const response = await fetch('http://localhost:3000/api/menudata');
    const menu = await response.json();

    return { menu }
}
