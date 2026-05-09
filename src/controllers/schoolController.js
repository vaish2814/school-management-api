const db = require("../config/database");
const getDistanceInKm = require("../utils/distanceCalculator");

const createSchool = async (req, res) => {
    try {
        const {
            name,
            address,
            latitude,
            longitude
        } = req.body;

        if (
            !name ||
            !address ||
            latitude === undefined ||
            longitude === undefined
        ) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields"
            });
        }

        const insertQuery = `
            INSERT INTO schools
            (name, address, latitude, longitude)
            VALUES (?, ?, ?, ?)
        `;

        await db.execute(insertQuery, [
            name,
            address,
            latitude,
            longitude
        ]);

        return res.status(201).json({
            success: true,
            message: "School added successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

const fetchSchools = async (req, res) => {
    try {
        const { latitude, longitude } = req.query;

        if (!latitude || !longitude) {
            return res.status(400).json({
                success: false,
                message: "User coordinates are required"
            });
        }

        const [schools] = await db.execute(
            "SELECT * FROM schools"
        );

        const formattedSchools = schools.map((school) => {
            const distance = getDistanceInKm(
                parseFloat(latitude),
                parseFloat(longitude),
                school.latitude,
                school.longitude
            );

            return {
                ...school,
                distanceInKm: Number(distance.toFixed(2))
            };
        });

        formattedSchools.sort(
            (first, second) =>
                first.distanceInKm -
                second.distanceInKm
        );

        return res.status(200).json({
            success: true,
            total: formattedSchools.length,
            data: formattedSchools
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

module.exports = {
    createSchool,
    fetchSchools
};