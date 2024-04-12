class Annonce{
    constructor(
        title,
        description,
        image,
        lieu,
        date,
        userId,
        participants,
        createdAt
    ) {
        this.title = title
        this.description = description
        this.image = image
        this.lieu= lieu
        this.date= date
        this.userId = userId
        this.participants= participants
        this.createdAt = createdAt
      
    }
}
module.exports = { Annonce }