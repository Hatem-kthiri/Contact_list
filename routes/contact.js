const router = require("express").Router();
const Contact = require("../models/Contact");

// add Contact

router.post("/addContact", async (req, res) => {
    try {
        const { firstName, lastName, phone, email } = req.body;
        const newContact = await Contact.create({
            firstName,
            lastName,
            phone,
            email,
        });
        res.json({
            status: 201,
            msg: "Contact Created Successfully",
            data: newContact,
        });
    } catch (err) {
        res.json({ status: 500, msg: "Problem with add Contact" });
    }
});

// get Contact

router.get("/getContacts", async (req, res) => {
    try {
        const getContact = await Contact.find({});
        res.json({ status: 200, msg: "All Contact", data: getContact });
    } catch (err) {
        res.json({ status: 500, msg: "Problem with get Contact" });
    }
});

// Update contact

router.put("/updateContact/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updateContact = await Contact.findByIdAndUpdate(id, {
            ...req.body,
        });
        res.json({
            status: 200,
            msg: "Contact updated successfully",
            data: updateContact,
        });
    } catch (err) {
        res.json({ status: 500, msg: "Problem with get Contact" });
    }
});

// delete contact

router.delete("/deleteContact/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteContact = await Contact.findByIdAndDelete(id);
        res.json({
            status: 200,
            msg: "Contact deleted Successfully",
            data: deletedContact,
        });
    } catch (err) {
        res.json({ status: 500, msg: "Problem with get Contact" });
    }
});

module.exports = router;
