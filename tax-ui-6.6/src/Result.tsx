import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Card,
  CardBody,
  CardHeader,
  CardProps,
  Center,
  Heading,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react'

import { CalcStatus } from './calcStatus'

type ResultProps = CardProps & {
  tax: number | null
  calcStatus: CalcStatus
}

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('ja-JP').format(price)
}

const BeforeView = () => (
  <Box aria-label="tax">
    <Text as="span" fontSize="6xl">
      ---
    </Text>
    <Text as="span" marginLeft={1}>
      円
    </Text>
  </Box>
)

const CalculatingView = () => <Spinner size="xl" m={5} />

const FailedView = () => (
  <Alert status="error">
    <AlertIcon />
    <AlertDescription>
      エラーが発生しました。しばらくしてからもう一度お試しください。
    </AlertDescription>
  </Alert>
)

const SucceededView = ({ tax }: { tax: number | null }) => {
  const taxStr = formatPrice(tax ?? 0)
  return (
    <Box aria-label="tax">
      <Text as="span" fontSize="6xl">
        {taxStr}
      </Text>
      <Text as="span" marginLeft={1}>
        円
      </Text>
    </Box>
  )
}

const CalcStatusView = ({
  tax,
  calcStatus,
}: {
  tax: number | null
  calcStatus: CalcStatus
}) => {
  switch (calcStatus) {
    case 'before':
      return <BeforeView />
    case 'calculating':
      return <CalculatingView />
    case 'succeeded':
      return <SucceededView tax={tax} />
    default:
      return <FailedView />
  }
}

export const Result = ({ tax, calcStatus, ...props }: ResultProps) => {
  return (
    <Card h="200px" w="400px" {...props}>
      <CardHeader>
        <Center>
          <Heading as="h3" size="md">
            退職金にかかる所得税
          </Heading>
        </Center>
      </CardHeader>
      <CardBody>
        <VStack>
          <CalcStatusView tax={tax} calcStatus={calcStatus} />
        </VStack>
      </CardBody>
    </Card>
  )
}
