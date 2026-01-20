from model.get_services import get_services

def get_service_id(data):
    services = get_services()
    
     # ---- Citizen Info ----
    office = data.get("office")
    
    for service in services:
        if service['service_name'] == office:
            service_id = service['service_id']
            return service_id
    
    return None