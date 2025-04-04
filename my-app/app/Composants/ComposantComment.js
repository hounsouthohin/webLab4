export default function ComposantComment({content}) {
    return (
        <div class="d-flex align-items-start mb-5">
            <i class="bi bi-person-circle text-white fs-1" ></i>
            <div class="ms-3 text-light">
                <p>{content}</p>
            </div>         
        </div>   
    );
}



