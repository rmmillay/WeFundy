import { createAFundraiserThunk } from "../../redux/fundraisers";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import "./FundCreate.css";
import { useState } from "react";
import { useModal } from "../../context/Modal";


function CreateFundraiser() {
    // hooks
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { closeModal } = useModal()

    // redux state
    const user = useSelector(state => state.session.user)

    const [errors, setErrors] = useState({}); 
    const [formData, setFormData] = useState({
        name: '',
    })

    if (!user){
        return <p>Please log in to create a fundraiser</p>
    }

    const handleFormData = async (e) => {
        setErrors({});
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })

    }
    const validateForm = () => {
        let validationErrors = {};
        if (!formData.name){
            validationErrors.name = 'Fundraiser name is required'
        }
        setErrors(validationErrors)
        return Object.keys(validationErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()){
            return;
        }

        const newFundraiserData = {
            name: formData.name,
        };

        const newFundraiser = await dispatch(createAFundraiserThunk(newFundraiserData))

        if (newFundraiser && newFundraiser.errors) {
            setErrors(newFundraiser.errors)
        } else if (newFundraiser && newFundraiser.id) {
            setFormData({name: ""});
            setErrors({});
            closeModal()
            navigate(`/fundraisers/${newFundraiser.id}`)
        }
    }

    return (

            <div className="create-form" onClick={(e) => e.stopPropagation()}>
              
                <form onSubmit={handleSubmit} className="create-fundraiser-form">
                   <div className="fundraiser-form">
                    <p>Create a New Fundraiser</p>
                    <input
                    type="text"
                    name="name"
                    placeholder="Fundraiser Name"
                    value={formData.name}
                    onChange={handleFormData}
                    />
                    {errors.name && <p className="errors">{errors.name}</p>}
                   </div>
                   <button type="submit" disabled={Object.keys(errors).length > 0}>
                    Create Fundraiser
                    </button>
                </form>
            </div>
    )
}

export default CreateFundraiser;