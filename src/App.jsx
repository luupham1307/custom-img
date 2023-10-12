import { useState, useRef, Fragment, } from "react";
import html2canvas from "html2canvas";
import { fileToDataUri, isImageFile } from "./helper/helper";
import infoImg from './assets/img/img.png'
import { useFormik } from "formik";
function App() {
    const previewRef = useRef(null);
    const [formType, setFormType] = useState('cusForm')
    const [textCustomForm, setTextCustomForm] = useState("");
    const [imgSrc, setImgSrc] = useState(null);
    const generateImage = () => {
        html2canvas(previewRef.current, { useCORS: true }).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.href = imgData;
            link.download = "generated-image.png";
            link.click();
        }).catch(err => console.log(err));
    };

    const formik = useFormik({
        initialValues: {
            fullName: '',
            dob: '',
            address: '',
            phone: '',
            bankName: '',
            accountNumber: ''
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });
    const setTypeForm = (event) => {
        setFormType(event.target.value);
    }
    const handleChangeTextArea = (e) => {
        let val = e.target.value;
        if (val) {
            setTextCustomForm(val)
        }
    }
    const onChangeFileImage = (file) => {
        if (!file) {
            setImgSrc(null);
            return;
        }
        if (!isImageFile(file.name)) {
            alert("File không phải ảnh!")
            return;
        }
        fileToDataUri(file)
            .then(dataUri => {
                setImgSrc(dataUri)
            })
    }
    return (
        <Fragment>
            <div className="custom-form">
                <input onChange={setTypeForm} type="radio" checked={formType === "cusForm"} value="cusForm" name="form" /> Custom form
                <input onChange={setTypeForm} type="radio" checked={formType === "form"} value="form" name="form" /> Form
                <input type="file" onChange={(event) => onChangeFileImage(event.target.files[0] || null)} />
            </div>
            {formType === "cusForm" ?
                <div className="custom-form">
                    <textarea
                        onChange={handleChangeTextArea}
                        rows="4"
                        cols="50"
                    />
                </div> :
                <form onSubmit={formik.handleSubmit}>
                    <div className="form-container">
                        <div className="form-container-inner">
                            <label htmlFor="fullName">Full name: </label>
                            <input
                                type="text"
                                className="form-input"
                                name="fullName"
                                placeholder="Full name"
                                onChange={formik.handleChange}
                                value={formik.values.fullName}
                            />
                        </div>

                        <div className="form-container-inner">
                            <label htmlFor="dob">Date of Birth:</label>
                            <input
                                type="text"
                                className="form-input"
                                name="dob"
                                placeholder="Date of Birth"
                                onChange={formik.handleChange}
                                value={formik.values.dob}
                            />
                        </div>
                        <div className="form-container-inner">
                            <label htmlFor="address">Address:</label>
                            <input
                                type="text"
                                className="form-input"
                                name="address"
                                placeholder="Address"
                                onChange={formik.handleChange}
                                value={formik.values.address}
                            />
                        </div>
                        <div className="form-container-inner">
                            <label htmlFor="phone">Phone Number:</label>
                            <input
                                type="text"
                                className="form-input"
                                name="phone"
                                onChange={formik.handleChange}
                                value={formik.values.phone}
                            />
                        </div>
                        <div className="form-container-inner">
                            <label htmlFor="bankName">Bank Name:</label>
                            <input
                                type="text"
                                className="form-input"
                                name="bankName"
                                onChange={formik.handleChange}
                                value={formik.values.bankName}
                            />
                        </div>
                        <div className="form-container-inner">
                            <label htmlFor="accountNumber">Account Number:</label>
                            <input
                                type="text"
                                className="form-input"
                                name="accountNumber"
                                onChange={formik.handleChange}
                                value={formik.values.accountNumber}
                            />
                        </div>
                    </div>
                </form>
            }
            <button className="custom-form" onClick={generateImage}>Generated</button>
            {imgSrc && <div className="container-wrappper">
                <div ref={previewRef} className="container">
                    <img src={imgSrc} alt="work" />
                    <div className="container-inner" >
                        <div className="inf-i">
                            <img className="inner-img" src={infoImg} alt="logo" />
                        </div>
                        <div className="inner-input" style={{ padding: "0px 6px 16px 6px" }}>
                            {formType === "cusForm" ?
                                <p style={{ whiteSpace: 'normal', wordWrap: "anywhere", lineBreak: "auto" }} dangerouslySetInnerHTML={{ __html: textCustomForm.replace('\n', '<br />') }}></p> :
                                <Fragment>
                                    <p style={{ whiteSpace: 'normal', wordWrap: "anywhere", lineBreak: "auto" }} >Full name: {formik.values.fullName}</p>
                                    <p style={{ whiteSpace: 'normal', wordWrap: "anywhere", lineBreak: "auto" }} >Day of birth: {formik.values.dob}</p>
                                    <p style={{ whiteSpace: 'normal', wordWrap: "anywhere", lineBreak: "auto" }} >Address: {formik.values.address}</p>
                                    <p style={{ whiteSpace: 'normal', wordWrap: "anywhere", lineBreak: "auto" }} >Phone: {formik.values.phone}</p>
                                    <p style={{ whiteSpace: 'normal', wordWrap: "anywhere", lineBreak: "auto" }} >Bank Name: {formik.values.bankName}</p>
                                    <p style={{ whiteSpace: 'normal', wordWrap: "anywhere", lineBreak: "auto" }} >Account Number: {formik.values.accountNumber}</p>
                                </Fragment>
                            }
                        </div>
                    </div>
                </div>
            </div>}
        </Fragment>
    );
}

export default App
