import dayjs from "dayjs"
import { FastifyInstance } from "fastify"
import { z } from "zod"
import { prisma } from "./lib/prisma"

export async function AppRoutes(app: FastifyInstance){
  app.post('/habits', async (req, res) => {
   const createhabitBody = z.object({
    title: z.string(),
    habit_WeekDays: z.array(
      z.number().min(0).max(6)
      )
   })

   const {title, habit_WeekDays} = createhabitBody.parse(req.body)

   const today = dayjs().startOf('day').toDate()

   await prisma.habit.create({
    data: {
      title,
      created_at: today,
      habit_WeekDays: {
        create: habit_WeekDays.map(weekDay => {
          return {
            week_day: weekDay
          }
        })
      }
    }
   })
  })


  app.get('/day', async (req) => {
    const getDayParams = z.object({
      date: z.coerce.date()
    })

    const {date} = getDayParams.parse(req.query)

    const weekDay = dayjs(date).get('day')
    const parsedDate = dayjs(date).startOf('day')

    const possibleHabits = await prisma.habit.findMany({
      where: {
        created_at: {
          lte: date
        },
        habit_WeekDays: {
          some: {
            week_day: weekDay
          }
        }
      }
    })

    const day = await prisma.day.findUnique({
      where: {
        date: parsedDate.toDate()
      },
      include: {
        dayHabit: true
      }
    })
    
    const completedHabits = day?.dayHabit.map(dayHabit => {
      return dayHabit.id
    })

    return {
      completedHabits,
      possibleHabits
    }
  })
}

