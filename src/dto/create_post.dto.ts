export class CreatePostReq {
    title: string;
    description: string;
    vehicle: VehicleDto;
}

export class VehicleDto {
    make_id: number;
    model_id: number;
    body_color: string[];
    body_type: string;
    first_registration: Date;
    fuel_type: string;
    gear: string;
    guarantee: boolean;
    had_accident: boolean;
    interior_color: string[];
    mileage: number;
    non_smoking_vehicle: boolean;
    number_of_doors: number;
    vehicle_condition: string;
    number_of_seats: number;
    previous_owners: number;
    price: number;
    seller: string;
    transmission: string;
    upholstery: string;
    variant: string;
    with_full_service_history: boolean;
    kw: number;
    hp: number;
    optionalEquipment: VehicleOptionalEquipmentDto;
}

export class VehicleOptionalEquipmentDto {
    abs: boolean;
    air_conditioning: boolean;
    automatic_climate: boolean;
    cd_player: boolean;
    digital_cockpit: boolean;
    mp3: boolean;
    usb: boolean;
    hill_holder: boolean;
    navigation: boolean;
}