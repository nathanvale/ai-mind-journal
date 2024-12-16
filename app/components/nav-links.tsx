import { Link } from 'react-router-dom'
import { Icon } from './ui/icon'

export const NavLinks: React.FC = () => {
	return (
		<div>
			<Link
				to=""
				className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
			>
				<Icon name="circle-gauge" className="h-4 w-4" />
				Dashboard{' '}
			</Link>
			<Link
				to="journal-entries"
				className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
			>
				<Icon name="notebook-pen" className="h-4 w-4" />
				Journal Entries
			</Link>
			<Link
				to="contacts"
				className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
			>
				<Icon name="users" className="h-4 w-4" />
				Contacts
			</Link>
			<Link
				to="analytics"
				className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
			>
				<Icon name="chart-line" className="h-4 w-4" />
				Analytics
			</Link>
		</div>
	)
}
