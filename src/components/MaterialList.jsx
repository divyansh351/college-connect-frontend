import { useEffect, useState } from "react";
import MaterialCard from "./MaterialCard";
import axios from 'axios';

const MaterialList = ({ id }) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [materialLink, setMaterialLink] = useState([]);
    const [materialDirect, setMaterialDirect] = useState([]);

    useEffect(() => {
        const fetchData = async (id) => {
            try {
                const response = await axios.get(`https://college-connect-backend-0x0i.onrender.com/course/${id}`);
                if (Array.isArray(response.data.material_direct) && Array.isArray(response.data.material_link)) {
                    setMaterialDirect(response.data.material_direct);
                    setMaterialLink(response.data.material_link);
                } else {
                    setError("Invalid data structure: material Link or direct is not an array.");
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData(id);
    }, []);

    return (
        <div className="material-list">
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {materialDirect.map((mat, index) => (
                <MaterialCard key={index} {...mat} />
            ))}
            {materialLink.map((mat, index) => (
                <MaterialCard key={index} {...mat} />
            ))}
        </div>
    );
};

export default MaterialList;
