import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Injectable} from "@nestjs/common";
import {Vehicle} from "../models/vehicle.entity";


@Injectable()
export class VehicleDao {
    constructor(
        @InjectRepository(Vehicle)
        private vehicleRepository: Repository<Vehicle>,
    ) {
    }

    findAll(): Promise<Vehicle[]> {
        return this.vehicleRepository.find();
    }

    findOne(id: number): Promise<Vehicle> {
        return this.vehicleRepository.findOneBy({id});
    }

    async remove(id: string): Promise<void> {
        await this.vehicleRepository.delete(id);
    }

    async insert(vehicle: Vehicle): Promise<Vehicle> {
        return this.vehicleRepository.save(vehicle, {reload: true});
    }

}