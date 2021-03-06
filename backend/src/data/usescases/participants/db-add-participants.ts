import { FindBarbecueByIdRepository } from '@/data/protocols/db/barbecue/find-barbecue-by-id-repository'
import { UpdateBarbecueRepository } from '@/data/protocols/db/barbecue/update-barbecue-repository'
import { AddParticipantsRepository } from '@/data/protocols/db/participants/add-participants-repository'
import { ParticipantsModel } from '@/domain/models/participants'
import { AddParticipants, AddParticipantsParams } from '@/domain/usescasses/participants/add-participants'

export class DbAddParticipants implements AddParticipants {
  constructor (
    private readonly addParticipantsRepository: AddParticipantsRepository,
    private readonly findBarbecueByIdRepository: FindBarbecueByIdRepository,
    private readonly updateBarbecueRepository: UpdateBarbecueRepository
  ) {}

  async add (participantsData: AddParticipantsParams): Promise<ParticipantsModel> {
    const barbacue = await this.findBarbecueByIdRepository.findById(participantsData.barbecue.id)

    const barbecueValue = barbacue.value
    const participantsDataValue = participantsData.value

    let sumValueParticipantToBarbecueValueTotal: number

    if (barbecueValue === null) {
      sumValueParticipantToBarbecueValueTotal = participantsDataValue
    } else {
      sumValueParticipantToBarbecueValueTotal = barbecueValue + participantsDataValue
    }

    const barbacueUpdateObject = { ...barbacue, value: sumValueParticipantToBarbecueValueTotal }

    const participants = await this.addParticipantsRepository.add(participantsData)

    await this.updateBarbecueRepository.update(barbacue.id, barbacueUpdateObject)

    return participants
  }
}
