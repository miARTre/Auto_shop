import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {VehicleOptionalEquipment} from "../models/vehicle.optional.equipment.entity";

@Injectable()
export class Vehicle_optional_equipmentDao {
    constructor(
        @InjectRepository(VehicleOptionalEquipment)
        private vehicleOptionalEquipmentRepository: Repository<VehicleOptionalEquipment>,
    ) {
    }

    findAll(): Promise<VehicleOptionalEquipment[]> {
        return this.vehicleOptionalEquipmentRepository.find();
    }

    findOne(id: number): Promise<VehicleOptionalEquipment> {
        return this.vehicleOptionalEquipmentRepository.findOneBy({id});
    }

    async remove(id: string): Promise<void> {
        await this.vehicleOptionalEquipmentRepository.delete(id);
    }

    insert(vehicleOptionalEquipment: VehicleOptionalEquipment): Promise<VehicleOptionalEquipment> {
        return this.vehicleOptionalEquipmentRepository.save(vehicleOptionalEquipment, {reload: true})
    }
}