export abstract class GameEvent {
    abstract name: String;
    //TODO - have a specific data type for ws data!!
    abstract execute(data: Record<"data" | "value", any>): void;
}
