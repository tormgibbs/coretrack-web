import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/log/sample')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/log/samples"!</div>
}
