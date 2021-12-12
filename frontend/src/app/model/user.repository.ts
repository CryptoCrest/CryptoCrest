import { Injectable } from "@angular/core";
import { User} from "./user.model";
import { ResponseModel } from "./response.model";
import { RestDataSource } from "./rest.datasource";

@Injectable()
export class UserRepository {
    private user: User[] = [];

    constructor(private dataSource: RestDataSource) {
        dataSource.getUserList().subscribe(data => {
            this.user = data;
        });
    }

    getUser(): User[] {
        return this.user;
    }

    getItem(id: string): User {
        return (this.user.find(item => item._id === id)!);
    }

    //saves survey from user
    saveUser(item: User) {
       
            this.dataSource.updateUser(item)
                .subscribe(p => {
                    this.user.splice(this.user.
                        findIndex(i => i._id == item._id), 1, item);
                });
        }
    }

  
