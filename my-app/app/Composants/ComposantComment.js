export default function ComposantComment({content}) {
    return (
        <div className="d-flex align-items-start mb-5">
            <i className="bi bi-person-circle text-dark fs-1" ></i>
            <div className="ms-3 text-dark">
                <p>{content}</p>
            </div>         
        </div>   
    );
}



