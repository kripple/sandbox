import './Toast.css'

export function Toast({toastId, removeMessage}) {
  return (


          <div className="Toast">
            I am a toast!

            <button className="Toast-button" onClick={() => removeMessage(toastId)}>
              Close
            </button>
          </div>


  )
}
