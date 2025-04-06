export default function ComposantComment({content}) {
    return (
        <div className="d-flex align-items-start mb-5">
            <i className="bi bi-person-circle text-white fs-1" ></i>
            <div className="ms-3 text-light">
                <p>{content}</p>
            </div>         
        </div>   
    );
}



