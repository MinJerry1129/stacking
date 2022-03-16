import { useWeb3React } from '@web3-react/core';

function TopNav(props: any) {

  const { active, deactivate} = useWeb3React();
  function handleToggle() {
    let cl = "sb-sidenav-toggled";
    let body = document.querySelector('body');
    if (body?.classList.contains(cl)) {
      body.classList.remove(cl);
    } else {
      body?.classList.add(cl);
    }
  }

  async function disconnect() {
    try {
      deactivate();
      console.log('click')     
    } catch (exc) {
      console.log(exc);
    }
  }

  const [show, setShow] = props.show;
  const html = <nav className="navbar navbar-expand-lg bg-dark">
    <div className="container-fluid">
      <i onClick={handleToggle} className="fa fa-bars fa-2x" id="sidebarToggle" />
      <ul className="navbar-nav ms-auto">
        <li className="nav-item">
          {active ? <a href="#" className="nav-link btn btn-sm btn-connect" onClick={disconnect}  >Disconnect</a>
            : <a href="#" className="nav-link btn btn-sm btn-connect" onClick={() => { setShow(!show) }} data-toggle="modal" data-target="#ConnectModal">Connect Wallet</a>}
        </li>
      </ul>
    </div>
  </nav>

  return html;
}

export default TopNav;