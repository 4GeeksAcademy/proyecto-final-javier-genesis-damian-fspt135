import React from "react"
import { useNavigate } from 'react-router-dom';


export const DataProfile = () => {
    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow-sm p-4">
                        <h2 className="text-center mb-4">Complete Your Profile</h2>
                        <form>
                            <hr className="my-4" />
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="firstName" className="form-label fw-bold">First Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="firstName"
                                        name="firstName"
                                        placeholder="John"
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="lastName" className="form-label fw-bold">Last Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="lastName"
                                        name="lastName"
                                        placeholder="Doe"
                                    />
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="birthDate" className="form-label fw-bold">Date of Birth</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="birthDate"
                                    name="birthDate"
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="profileImg" className="form-label fw-bold">Profile Image URL</label>
                                <input
                                    type="url"
                                    className="form-control"
                                    id="profileImg"
                                    name="profileImg"
                                    placeholder="https://example.com/avatar.jpg"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="description" className="form-label fw-bold">Description</label>
                                <textarea
                                    className="form-control"
                                    id="description"
                                    name="description"
                                    rows="4"
                                    placeholder="Tell us about yourself..."
                                ></textarea>
                            </div>

                            <div className="d-grid">
                                <button type="submit" className="btn btn-primary btn-lg">Save Profile</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}