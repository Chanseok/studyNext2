import fs from 'fs';
import CSV from 'comma-separated-values';


export default (req, res) => {
    const rawData = fs.readFileSync('./price4menu.csv', 'utf8');
    const csv = new CSV(rawData, {header: true});    

    res.statusCode = 200
    res.json( csv.parse())
}
